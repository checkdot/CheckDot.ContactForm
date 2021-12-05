import React, { useState, useEffect } from "react";
import { SectionsContainer, Section, ScrollToTopOnMount } from "react-fullpage";
import Questions from "./Questions";
import Start from "./Start";
import End from "./End";
import swal from "sweetalert";
import "./static/style";
import FormQuestions from "../form.json";

// => in the render() method of your app
const data = [
  {
    type: "start",
    title:
      "Fill this form to get a free quote from our experts. You will hear from us<br>soon.<br>🤝",
    description: "",
    id: "start",
    link: "project_name",
    i: 0,
  },
  {
    type: "text",
    title: "Please tell us your Project Name (or) Website Link? *",
    description: "",
    id: "project_name",
    link: "source_code",
    i: 1,
  },
  {
    type: "text",
    title:
      "Please provide us with the link to your smart contracts source code? *",
    description:
      "It will help us get more acquainted with your project. You can share a link to any of the following: GitHub/Etherscan/Bscscan",
    id: "source_code",
    link: "contact",
    i: 2,
  },
  {
    type: "text",
    title:
      "Please provide contact details ( Telegram / Email / Skype / Discord) ? 📩 *",
    description: "",
    id: "contact",
    link: "additionnal_infos",
    i: 3,
  },
  {
    type: "text",
    title: "Additional Information (optionnal)",
    description: "",
    id: "additionnal_infos",
    link: "end",
    i: 4,
  },
  {
    type: "end",
    title:
      "Thanks for contacting us! We will be in touch with you shortly.<br>Your privacy is our priority. We protect your personal information.<br>🙌",
    description: "",
    id: "end",
    link: "",
    i: 5,
  },
];

const anchorFunc = (anchor_data) => {
  // return array of anchor tags
  return anchor_data.map((item) => item.id);
};

export default function FullPage() {
  let options = {
    sectionClassName: "section",
    anchors: anchorFunc(data),
    scrollBar: false,
    navigation: false,
    verticalAlign: false,
    sectionPaddingTop: "0px",
    sectionPaddingBottom: "0px",
    arrowNavigation: false,
    touchNavigation: false,
    delay: 800,
  };

  const [obj, setObj] = useState({});
  const [questions, setQuestions] = useState([]);
  const [qnLinks, setQnLinks] = useState([]);

  const inputDataHandler = (name, value) => {
    console.log(name, value);
    console.log(obj);
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const submitBtnHandler = () => {
    console.log(obj);
    //API call here

    const url = "https://api.checkdot.io/requests/index.php";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      mode: "cors",
    })
      .then((response) => {
        console.log(response);
        swal({
          //show success message on completion
          title: "",
          text: "Thanks for contacting us!",
          icon: "success",
          dangerMode: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        swal({
          title: "",
          text: "Something went wrong when submiting",
          icon: "fail",
          dangerMode: true,
        });
      });
  };

  const getLogo = () => {
    // Import result is the URL of your image
    return (
      <a href={"/"}>
        <img class="logo" src="public/logo-white.png" />
      </a>
    );
  };

  const getItem = (item, i) => {
    console.log(item);
    if (item.type === "start") {
      return <Start item={item} />;
    }
    if (item.type === "end") {
      return <End obj={obj} item={item} submitBtnHandler={submitBtnHandler} />;
    }
    return (
      <Questions item={item} index={i} inputDataHandler={inputDataHandler} />
    );
  };

  useEffect(() => {
    setQuestions(FormQuestions);

    const links = [];
    for (let i = 0; i < FormQuestions.length; i++) {
      links.push(FormQuestions[i].link);
    }

    setQnLinks(links);
  }, []);

  const changeQn = (direction) => {
    const currentLocation = window.location.href;
    const locationIdx = qnLinks.indexOf(currentLocation.split("#")[1]);
    switch (direction) {
      case "inc":
        // alert(currentLocation);
        if (locationIdx === -1) {
          window.location.href = `#${qnLinks[0]}`;
          return;
        }

        if (locationIdx + 1 < qnLinks.length - 1) {
          window.location.href = `#${qnLinks[locationIdx + 1]}`;
        }

        break;
      case "dec":
        if (locationIdx === 0) {
          window.location.href = window.location.href.split("#")[0];
          return;
        }
        window.location.href = `#${qnLinks[locationIdx - 1]}`;
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {getLogo()}
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        {questions &&
          questions.map((item, i) => {
            return (
              <Section key={i}>
                <div>
                  <header className="App-header">{getItem(item, i)}</header>
                </div>
              </Section>
            );
          })}
      </SectionsContainer>
      <div
        style={{
          position: "fixed",
          bottom: "0%",
          display: "flex",
          width: "100%",
        }}
      >
        <p onClick={() => changeQn("dec")}>
          <i
            style={{
              border: "1px solid white",
              borderWidth: "0 3px 3px 0",
              display: "inline-block",
              padding: "5px",
              transform: "rotate(-135deg)",
              marginRight: "1rem",
              cursor: "pointer",
              marginLeft: "1rem",
            }}
            class="arrow right"
          ></i>
        </p>
        <p onClick={() => changeQn("inc")}>
          <i
            style={{
              border: "1px solid white",
              borderWidth: "0 3px 3px 0",
              display: "inline-block",
              padding: "5px",
              transform: "rotate(45deg)",
              textAlign: "left",
              marginLeft: "1rem",
              cursor: "pointer",
              position: "fixed",
              marginTop: "-4px"
            }}
            class="arrow right"
          ></i>
        </p>
      </div>
    </div>
  );
}
