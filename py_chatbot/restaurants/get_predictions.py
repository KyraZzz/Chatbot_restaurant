import nltk
from nltk.stem.lancaster import LancasterStemmer
import numpy as np
import tflearn
import tensorflow
import random
import json
import pickle

from .meal_suggestion import request


def getPredictions(user_input):

    words, labels, training, output = pickle.load(
        open("restaurants/processing_model/data.pickle", "rb"))

    with open("restaurants/processing_model/intents.json") as file:
        data = json.load(file)

    tensorflow.compat.v1.reset_default_graph()
    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 1
    net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 2
    # softmax gives a probablity for each output neural node
    net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
    net = tflearn.regression(net)

    model = tflearn.DNN(net)

    try:
        model.load("restaurants/processing_model/model.tflearn")
    except:
        model.fit(training, output, n_epoch=1000,
                  batch_size=8, show_metric=True)
        model.save("restaurants/processing_model/model.tflearn")

    def bag_of_words(s, words):
        bag = [0 for _ in range(len(words))]
        stemmer = LancasterStemmer()
        s_words = nltk.word_tokenize(s)
        s_words = [stemmer.stem(word.lower()) for word in s_words]

        for se in s_words:
            for i, w in enumerate(words):
                if w == se:
                    bag[i] = 1

        return np.array(bag)

    results = model.predict([bag_of_words(user_input, words)])[0]
    results_index = np.argmax(results)  # index of the greatest number
    tag = ""
    if results[results_index] > 0.7:
        tag = labels[results_index]
        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg["responses"]
                if responses != []:
                    return (tag, random.choice(responses))

    else:
        return (tag, "I didn't get that, try again.")
