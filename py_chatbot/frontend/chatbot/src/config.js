import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import FindRestaurant from "./components/FindRestaurant/FindRestaurant";
import FoodCategory from "./components/FoodCategory/FoodCategory";
import ChattyBotAvatar from "./components/ChattyBotAvatar/ChattyBotAvatar";
import Todo from "./components/Todo/Todo";
import LearningOptions from "./components/LearningOptions/LearningOptions";
import RestName from './components/RestName/RestName';
import ShowChoice from './components/ShowChoice/ShowChoice';
import PriceRange from './components/PriceRange/PriceRange';
import LinkList from './components/LinkList/LinkList';
import SearchEngine from './components/SearchEngine/SearchEngine';

const config =  {
    botName: "ChattyBot",
    initialMessages: [createChatBotMessage("Hi, what can I help you?"),
],
    customStyles:{
        botMessageBox: {
            backgroundColor: "#376B7E",
          },
          chatButton: {
            backgroundColor: "#376B7E",
          },
    },
    
    customComponents: {
      botAvatar: (props) => <ChattyBotAvatar {...props} />
    },

    state: {
      category: "",
      price: "",
      todoList: [],
      chosenRestText: "",
      chosenRestUrl: "",
      num: [],
      searchRes : []
    },

    widgets: [
        {
            widgetName: "todo",
            widgetFunc: (props) => <Todo {...props} />,
            mapStateToProps: [
              "todoList"
            ],
        },
        {
          widgetName: "searchEngine",
            widgetFunc: (props) => <SearchEngine {...props} />,
            mapStateToProps: [
              "searchRes"
            ],
        },
        {
          widgetName: "SearchChoice",
          widgetFunc: (props) => <LearningOptions {...props} />, 
          mapStateToProps: [
            "chosenRestText",
            "chosenRestUrl"
          ],
        },
        {
          widgetName: "RestName",
          widgetFunc: (props) => <RestName {...props} />
        },
        {
          widgetName: "foodcategory",
            widgetFunc: (props) => <FoodCategory {...props} />,
            props: {
              options: [
                {
                  text: "British",
                  id: 1,
                },
                {
                  text: "Chinese",
                  id: 2,
                },
                {
                  text: "Fast Food",
                  id: 3,
                },
                {
                  text: "Cakeshop",
                  id: 4,
                },
                {
                  text: "Italian",
                  id: 5,
                },
                {
                  text: "Brasseries",
                  id: 6,
                },
                {
                  text: "Cafes",
                  id: 7,
                },
                {
                  text: "Vietnamese",
                  id: 8,
                },
                {
                  text: "Burgers",
                  id: 9,
                },
                {
                  text: "Steakhouses",
                  id: 10,
                },
                {
                  text: "Sandwiches",
                  id: 11,
                },
                {
                  text: "Coffee & Tea",
                  id: 12,
                },
                {
                  text: "Lebanese",
                  id: 13,
                },
                {
                  text: "Mexican",
                  id: 14,
                },
                {
                  text: "Chicken Shop",
                  id: 15,
                },
                {
                  text: "Korean",
                  id: 16,
                },
                {
                  text: "Delis",
                  id: 17,
                },
                {
                  text: "Hookah Bars",
                  id: 18,
                },
                {
                  text: "Cocktail Bars",
                  id: 19,
                },
                {
                  text: "Greek",
                  id: 20,
                },
                {
                  text: "Beer Bar",
                  id: 21,
                },
                {
                  text: "Wine Bars",
                  id: 22,
                },
                {
                  text: "Breakfast & Brunch",
                  id: 23,
                },
              ],
            },
            mapStateToProps: [
              "category",
              "price",
            ],
        },
        {
          widgetName: "pricerange",
            widgetFunc: (props) => <PriceRange {...props} />,
            props: {
              options: [
                {
                  text: "£",
                  id: 1,
                },
                {
                  text: "££",
                  id: 2,
                },
                {
                  text: "£££",
                  id: 3,
                },
              ],
            },
            mapStateToProps: [
              "category",
              "price",
            ],
          },
          {
            widgetName: "FindRestaurant",
            widgetFunc: (props) => <FindRestaurant {...props} />,
            mapStateToProps: [
              "category",
              "price",
            ],
          },
          {
            widgetName: "ShowChoice",
            widgetFunc: (props) => <ShowChoice {...props} />,
            mapStateToProps: [
              "chosenRestText",
              "chosenRestUrl"
            ],
          },
          {
            widgetName: "OxPic",
            widgetFunc: (props) => <LinkList {...props} />,
            mapStateToProps: [
              "num"
            ],
        }      
    ],
}

export default config