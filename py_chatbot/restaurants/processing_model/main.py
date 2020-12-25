import nltk
from nltk.stem.lancaster import LancasterStemmer
import numpy as np
import tflearn
import tensorflow
import random
import json
import pickle


# take each word and get root of the word, no punctuations and extra characters
stemmer = LancasterStemmer()

with open("./intents.json") as file:
    data = json.load(file)

with open("./data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)

tensorflow.compat.v1.reset_default_graph()
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 1
net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 2
# softmax gives a probablity for each output neural node
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
except:
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")


def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return np.array(bag)


def chat():
    print("Start talking with the bot!(type quit to stop)")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break

        results = model.predict([bag_of_words(inp, words)])[0]  # gives a list
        # print(results)  # [[0.25688338 0.25056154 0.33363694 0.0542621  0.06893101 0.03572503]]
        results_index = np.argmax(results)  # index of the greatest number
        if results[results_index] > 0.7:
            tag = labels[results_index]
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg["responses"]
                    if responses != []:
                        print(random.choice(responses))
                        break
                    else:
                        print(tag)

        else:
            print("I didn't get that, try again.")


chat()
