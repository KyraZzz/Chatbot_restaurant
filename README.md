# Dialogue system project - a chatbot as a personal assistant
## Initiatives:
1. Friends around me say it is always difficult for them to choose what to eat for lunch & dinner, so if a chatbot can give them some suggestions based on the categories of the food as well as the price range, that will be practically useful.
2. Besides meal suggestion service, I also want to implement some other services such as restaurant information retrieval, daily to-do lists and free chatting.
3. For the free-chatting part, I would like to try to use some basic machine learning models so that there is no need to manually type up all the patterns. If the chatbot has no idea what the user is talking about, we can implement a google search API so that at least we can give users some potentially useful ideas instead of a plain text "I don't get what you mean, try something else".
4. After reading the paper [Stanford - overview of the dialogue system](https://www.notion.so/Read-research-paper-get-an-overview-of-the-dialogue-system-b8e85e95d4a542bc9483e1898224f7b3#5f080da6289748ee847248bfe35c6b8f), 

## Targets:
[1. Meal suggestion & Free chatting](#freeChatting)

[2. Restaurant information retrieval](#info)

[3. Daily to-do list](#toDo)

[4. Google search api](#googleSearch)

## Development process:
## 1.Meal suggestion & Free chatting <a name="freeChatting"></a>
### 1.1 Data collection
In order to avoid using pattern matching and manually typing up all the logics for the dialogues between chatbot and user, I attempted to train the chatbot via machine learning. The machine learning algorithm I have picked is called Feed Forward Neural Net model. I will explain the detailed algorithm through codes.

Firstly, we have to collect some data for training and I found a dataset - [The intent classification dataset from Kaggle](https://www.kaggle.com/elvinagammed/chatbots-intent-recognition-dataset) and add more own intent pattern and responses for the `meal suggestion` intent as follows:
``` python
{"tag":"meal_suggestion",
  "patterns":["What should I eat?", "Do you have any meal recommendations?",
                "I am hungry.", "I want some meal suggestions.",
                "Can you give me any suggestions for breakfast?", "Can you give me any suggestions for lunch?",
                "Can you give me any suggestions for dinner?", "Any ideas for the meals today?",
                "I don't know what I should eat for today.", "I would like some advice on meals."],
   "responses":[]
        }
```

### 1.2 Intent classification
After getting an input text from the user, we would like to classify this user input into one of the 18 intents. Each of the intents has a non-empty `pattern list` and a non-empty `response list`, despite the `meal suggestion` intent which only has a `pattern list` and an empty `response list`. The reason for an empty `response list` is that this `meal suggestion` intent has two information slots required (i.e., `category` and `price`) from the user and a single text response is not sufficient, we have to introduce some state changes to fulfil these requirements.

I learnt the basic `Feed Forward Neural Net model` mainly from a Youtube video: [Explainining NLP basics](https://www.notion.so/Week-4-report-2d30399c959549e5a28ec2d5e336df9d#5c2b3aae97fc4cb8ad20d5130ce182ad). Here is the detailed procedure for intent classification:

#### 1.2.1 Tokenise the words:
Data processing prefers numbers rather than characters because vectorised thinking is more efficient and vectors are constructed using numbers. Hence for each pattern in each intent, we tokenize the words and find all the unique words in our patterns.

```python
...
with open("./intents.json") as file:
    data = json.load(file)
words = []
labels = []
docs_x = []
docs_y = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        wrds = nltk.word_tokenize(pattern) # list of tokens for each sentence
        words.extend(wrds)
        docs_x.append(wrds)
        docs_y.append(intent["tag"])
    if intent["tag"] not in labels:
        labels.append(intent["tag"])

# word normalisation
words = [stemmer.stem(w.lower()) for w in words if w not in ["?", ".", ",", "!"]] 
# remove duplicated words, sort to make it easier to work with
words = sorted(list(set(words)))

labels = sorted(labels)
```

#### 1.2.2 Word normalisation: 
 We first find the root of a lowercase word using the `LancasterStemmer` from the `nltk(Natural Language Tool Kit)` library. For instance, the common root for `playing, plays and play` is `play`. In that way, we can normalise the texts into a root form. In addition, all the punctuations are excluded at the end.

```python
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

... 

training = []
output = []

# one hot method
out_empty = [0 for _ in range(len(labels))]

for x, doc in enumerate(docs_x):
    bag = []
    wrds = [stemmer.stem(w.lower()) for w in doc if w not in ["?", ".", ",", "!"]]

    for w in words:
        if w in wrds:
            bag.append(1)
        else:
            bag.append(0)

    output_row = out_empty[:]
    output_row[labels.index(docs_y[x])] = 1

    training.append(bag)
    output.append(output_row)

```
For each sentence in the `docs_x` training dataset, we tokenised and normalised the words in it and stored in the `wrds` list. Then using the one-hot method, for each sentence, detect the number of the words occurred and get a binary list. For instance, `How are you` might become:
```python
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
```
This process is called producing `a bag of words`. At the same time, we have to keep track of the label(or tag) for each sentence, so using the one-hot method, the intent `meal suggestion` becomes `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]`

After getting the bags of words, we are going to train the dataset onto a Feed Forward Neural Net model:
![Feed Forward Neural Net](https://github.com/KyraZzz/Chatbot_restaurant/blob/main/model.png)
The sentence has been pre-processed and converted into a bag of words, then it is fed into 2 hidden layers. Each hidden layer calculates \\(weights \times input(x) + bias(b)\\) and an activation function. In our case `net = tflearn.fully_connected(net, 8)` means we have a hidden layer of 8 neurals, a default activation function of `linear`, a zero bias and weights generated from a truncated normal distribution(truncated values following a normal distribution with specified mean and standard deviation to prevent generating dead neurons). The output layer has an activation function called `softmax` which is used to generate a list of probabilities for each intent.

``` python
training = np.array(training)
output = np.array(output)

tensorflow.compat.v1.reset_default_graph()
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 1
net = tflearn.fully_connected(net, 8)  # 8 neurals for the hidden layer 2
# softmax gives a probablity for each output neural node
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)
```
![Softmax Activation Function](https://github.com/KyraZzz/Chatbot_restaurant/blob/main/softmax.jpeg)

``` python
model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
model.save("model.tflearn")

# save into pickle
with open("./data.pickle", "wb") as f:
    pickle.dump((words, labels, training, output), f)
```

### 1.3 Django backend server set-up
As a default choice, we can 
### 1.4 React frontend set-up

### 1.5 Connect backend with frontend


## 2.Restaurant information retrieval <a name="info"></a>
### 2.1 React fronend logic
### 2.2 Django backend logic

## 3.Daily to-do list <a name="toDo"></a>
### 3.1 React fronend logic
### 3.2 Django backend logic


## 4.Google search api <a name="googleSearch"></a>
### 4.1 React fronend logic
### 4.2 Django backend logic



## References:
1. [Training a Goal-Oriented Chatbot with Deep Reinforcement Learning](https://www.notion.so/Week-2-report-8424ccc9fa014ae08de5bb09eb56ed26#29c0dbdc9b17416d8c42e43b6746712c)
2. [Build chatbot from scratch - youtube video](https://www.notion.so/Week-2-report-8424ccc9fa014ae08de5bb09eb56ed26#a3fef205be16449e871be097146a61c1)
3. [Siamese Network Keras for Image and Text similarity](https://www.notion.so/Week-2-report-8424ccc9fa014ae08de5bb09eb56ed26#a7258d13fc8641f3a2fceacc0c9af92b)
4. [A chatbot with deep learning algorithm - Tech with Tim](https://www.notion.so/Week-3-report-f50b02db4c074403af1420990a14ea4d#648adcb4f65b45aabcfe739a72ba85d7)
5. [Stanford - overview of the dialogue system](https://www.notion.so/Read-research-paper-get-an-overview-of-the-dialogue-system-b8e85e95d4a542bc9483e1898224f7b3#5f080da6289748ee847248bfe35c6b8f)
6. [Explainining NLP basics](https://www.notion.so/Week-4-report-2d30399c959549e5a28ec2d5e336df9d#5c2b3aae97fc4cb8ad20d5130ce182ad)
7. [Chatbot React frontend UI tutorial](https://www.notion.so/Week-4-report-2d30399c959549e5a28ec2d5e336df9d#083e2132cb864ebdbae4c933279bf32b)
8. [Google search service for a chatbot](https://www.notion.so/Week-4-report-2d30399c959549e5a28ec2d5e336df9d#9824864726dd4bef9b7417d612086407)
9. [Intent classification dataset from Kaggle](https://www.kaggle.com/elvinagammed/chatbots-intent-recognition-dataset)
   
