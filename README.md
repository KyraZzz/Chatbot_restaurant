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
### 1.Meal suggestion & Free chatting <a name="freeChatting"></a>
#### 1.1 Data collection
In order to avoid using pattern matching and manually typing up all the logics for the dialogues between chatbot and user, I attempted to train the chatbot via machine learning. The machine learning algorithm I have picked is called CNN (central neural network). I will explain the detailed algorithm through codes.

Firstly, we have to collect some data for training and I found a dataset - [The intent classification dataset from Kaggle](https://www.kaggle.com/elvinagammed/chatbots-intent-recognition-dataset) and add more own intent pattern and responses for the `Meal suggestion` intent as follows:
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

#### 1.2 Intent classification

#### 1.3 Django backend server set-up
#### 1.4 React frontend set-up
#### 1.5 Connect backend with frontend


### 2.Restaurant information retrieval <a name="info"></a>
#### 2.1 React fronend logic
#### 2.2 Django backend logic

### 3.Daily to-do list <a name="toDo"></a>
#### 3.1 React fronend logic
#### 3.2 Django backend logic


### 4.Google search api <a name="googleSearch"></a>
#### 4.1 React fronend logic
#### 4.2 Django backend logic



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
   
