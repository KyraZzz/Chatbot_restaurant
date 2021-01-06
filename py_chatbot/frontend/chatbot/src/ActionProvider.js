class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    handleTodo = () => {
        const message = this.createChatBotMessage("What's your TODO task?",{
            widget:"todo",
        })
        this.updateChatbotState(message)
    }

    commonResponse = (output) => {
        const greetingMessage = this.createChatBotMessage(output)
        this.updateChatbotState(greetingMessage)
    }

    handleCategory = () => {
        const message = this.createChatBotMessage(
           "What kind of food category do you prefer?",
           {
               widget: "foodcategory",

           }
        );
        this.updateChatbotState(message)
    }

    handlePrice = (option) => {
        const message = this.createChatBotMessage(
            "What kind of price range do you prefer?",
            {
                widget: "pricerange",
            }
         );
         this.setState((state) => ({
             ...state,
             category: option.text,
             messages: [...state.messages,message],
         }))
    }

    handleMealSuggestion = (choice) => {
        const message = this.createChatBotMessage(
            "Based on your preferences:",
            {
                widget: "FindRestaurant",
            }
         );
         this.setState((state) => ({
             ...state,
             price: choice.text,
             messages: [...state.messages,message],
         }));
        
    }

    handleInfo(){
        const message = this.createChatBotMessage(
            "Do you want to search by name or category?",
            {
                widget: "SearchChoice",
            }
         );
         this.updateChatbotState(message)
    }

    handleName = () => {
        const message = this.createChatBotMessage(
            "Please select the restaurants you are interested in:",
            {
                widget: "RestName",
            }
         );
         this.updateChatbotState(message)
    }

    handleConfirm = (choice) => {
        const message = this.createChatBotMessage(
            "Here is the infomation for the restaurant you have chosen:",
            {
                widget: "ShowChoice",
            }
         );
         this.setState((state) => ({
             ...state,
             chosenRestText: choice.text,
             chosenRestUrl: choice.url,
             messages: [...state.messages,message],
         }));
    }

    handleCow(num){
        const message = this.createChatBotMessage(
            "Happy New Year!! Ox is the zodiac sign for 2021 Chinese New Year. Here is a random Ox for you:",
            {
                widget: "OxPic",
            }
         );
         this.setState((state) => ({
            ...state,
            num,
            messages: [...state.messages,message],
        }));
    }

    updateChatbotState(message){
        this.setState(prevState => ({
            ...prevState, 
            messages: [...prevState.messages,message]
        }))
    }

  }
  
  export default ActionProvider;