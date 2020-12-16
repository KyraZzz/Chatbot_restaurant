# Intent classification
# intent 1: meal suggestion
# intent 2: restaurant information retrieval
# intent 3: restaurant reservation

# Entity extraction
# Action

import json
import numpy as np
import pandas as pd
import random
import string
from keras.models import model_from_json
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split


# load json and create model
def load_model():
    json_file = open('saimese_network_model/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.compile(loss="binary_crossentropy", metrics=[
                         "accuracy"], optimizer=Adam(0.00001))
    return loaded_model


def predit_intent(loaded_model, custom_input, intent_I1, intent_I2, intent_I3):
    res_1 = np.sum(loaded_model.predict([custom_input, intent_I1]))
    res_2 = np.sum(loaded_model.predict([custom_input, intent_I2]))
    res_3 = np.sum(loaded_model.predict([custom_input, intent_I3]))
    return [res_1, res_2, res_3]


def final_intent_res(res):
    max = 0
    for i in range(1, len(res)):
        if res[i] > res[max]:
            max = i
    return max+1


# list all the initial intent
intent = {"I1": ["What should I eat?", "Do you have any meal recommendations?",
                 "I am hungary.", "I want some meal suggestions.",
                 "Can you give me any suggestions for breakfast?", "Can you give me any suggestions for lunch?",
                 "Can you give me any suggestions for dinner?", "Any ideas for the meals today?",
                 "I don't know what I should eat for today.", "I would like some advice on meals."],
          "I2": ["Can I get some information about a restaurant?", "Can you find some info about a restaurant?",
                 "I want to know some information.", "Can you find the location of a restaurant?",
                 "Where can I find information about the restaurants around me?", "Could you please help me find out the phone number of a restaurant?",
                 "I want to get some information about a particular restaurant.", "Are you capable of extracting restaurant information from the internet?",
                 "Can you find some restaurants which offer breakfast?", "Can you find some restaurants which offer afternoon tea?"],
          "I3": ["Can you help me to book a table?", "I want to book a restaurant.",
                 "I want to book a table for tonight.", "I have to arrange a party.",
                 "Can you book a table for me?", "I would like to reserve a table for the dinner tomorrow, can you help me with that?",
                 "Are you capable of reserving tables in restaurants?", "I have to book a restaurant table in advance.",
                 "Can you help me reserve a table?", "Can you help me book a restaurant?"]}

# find all the combination of the intents, add an addition tag 1/0 to distinguish the same or different intent cetegory


def getComb(intent):
    all_intent = []
    for i in intent:
        for j in range(0, len(intent[i])):
            for p in range(j+1, len(intent[i])):
                # same intents, set as 1
                all_intent.append([intent[i][j], intent[i][p], 1])

    order = [["I1", "I2"], ["I2", "I3"], ["I3", "I2"]]
    k = 0
    while k < 3:
        for i in intent[order[k][0]]:
            for j in intent[order[k][1]]:
                all_intent.append([i, j, 0])  # different intents, set as 0
        k += 1

    return all_intent

# pre-process intents


def process_intents(intent, t, max_len):
    intent_I1 = intent["I1"]
    intent_I1 = np.array(intent_I1)
    intent_I1 = t.texts_to_sequences(intent_I1)
    intent_I1 = pad_sequences(
        intent_I1, maxlen=max_len, padding='post', truncating='post')

    intent_I2 = intent["I2"]
    intent_I2 = np.array(intent_I2)
    intent_I2 = t.texts_to_sequences(intent_I2)
    intent_I2 = pad_sequences(
        intent_I2, maxlen=max_len, padding='post', truncating='post')

    intent_I3 = intent["I3"]
    intent_I3 = np.array(intent_I3)
    intent_I3 = t.texts_to_sequences(intent_I3)
    intent_I3 = pad_sequences(
        intent_I3, maxlen=max_len, padding='post', truncating='post')

    return intent_I1, intent_I2, intent_I3


# remove punctuations
def remove_punc(text):
    table = str.maketrans("", "", string.punctuation)
    return text.translate(table)


def __init__():
    all_comb = getComb(intent)
    # shuffle the original list so that the output will not be all 1s then all 0s
    random.shuffle(all_comb)

    data = [[], [], []]
    for i in all_comb:
        data[0].append(i[0])
        data[1].append(i[1])
        data[2].append(i[2])

    # Calling DataFrame constructor after zipping
    # both lists, with columns specified
    df = pd.DataFrame(list(zip(data[0], data[1], data[2])),
                      columns=['S1', 'S2', 'OUT'])
    X_train, X_test, y_train, y_test = train_test_split(
        df[["S1", "S2", "text"]], df["OUT"], test_size=0.2, random_state=8)
    max_len = 17
    num_words = 74
    t = Tokenizer(num_words=num_words)
    t.fit_on_texts(X_train['text'].values)
    loaded_model = load_model()
    intent_I1, intent_I2, intent_I3 = process_intents(intent, t, max_len)
    while True:
        text_input = input()
        text_input = remove_punc(text_input)
        custom_input = []

        for i in range(0, len(intent["I1"])):
            custom_input.append(text_input)
            custom_input = np.array(custom_input)
            custom_input = t.texts_to_sequences(custom_input)
            custom_input = pad_sequences(
                custom_input, maxlen=max_len, padding='post', truncating='post')

        intent_res_all = predit_intent(
            loaded_model, custom_input, intent_I1, intent_I2, intent_I3)
        intent_index = final_intent_res(intent_res_all)
        print(intent_index)
