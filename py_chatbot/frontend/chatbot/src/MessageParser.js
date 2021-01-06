import axios from "axios";
import * as settings from './setting';

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse = async (message) => {
    const lowerCaseMessage = message.toLowerCase();

    // Axios variables required to call the predict API
    let url = settings.API_SERVER + '/restaurants/predict';
    let response = await axios.post(url, {"data":lowerCaseMessage});
    const tag = response.data["tag"];
    const output = response.data["output"];

    // const {data:posts} = await axios.get("http://127.0.0.1:8000/restaurants/frontend")

    if (lowerCaseMessage === "todo"){
      this.actionProvider.handleTodo();
    }
    else if (lowerCaseMessage === "happy new year"){
      let num = Math.round(Math.random() * 10) % 5 + 1;
      this.actionProvider.handleCow(num);
    }
    else if (tag === "meal_suggestion"){
      this.actionProvider.handleCategory();
    }
    else if (tag === "restuarant_info"){
      this.actionProvider.handleInfo();
    }
    else{
      this.actionProvider.commonResponse(output);
    }

    }
  }

  export default MessageParser;