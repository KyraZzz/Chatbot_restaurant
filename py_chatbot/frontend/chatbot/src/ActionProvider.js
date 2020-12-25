class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    commonResponse = (output) => {
        const greetingMessage = this.createChatBotMessage(output)
        this.updateChatbotState(greetingMessage)
    }

    handleCategory = (posts) => {
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

    handleMealSuggestion = (option) => {
        const message = this.createChatBotMessage(
            "Based on your preferences:",
            {
                widget: "FindRestaurant",
            }
         );
         this.setState((state) => ({
             ...state,
             price: option.text,
             messages: [...state.messages,message],
         }))
        
    }

    updateChatbotState(message){
        this.setState(prevState => ({
            ...prevState, 
            messages: [...prevState.messages,message]
        }))
    }

  }
  
  export default ActionProvider;