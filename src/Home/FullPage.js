import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import Questions from './Questions';
import Start from './Start';
import End from './End';
import swal from 'sweetalert';
import './static/style';

// => in the render() method of your app
const data = [
  {
    type: 'start',
    title: 'Fill this form to get a free quote from our experts. You will hear from us<br>soon.<br>🤝',
    description: '',
    id: 'start',
    link: 'project_name',
    i: 0
  },
  {
    type: 'text',
    title: 'Please tell us your Project Name (or) Website Link? *',
    description: '',
    id: 'project_name',
    link: 'source_code',
    i: 1
  },
  {
    type: 'text',
    title: 'Please provide us with the link to your smart contracts source code? *',
    description: 'It will help us get more acquainted with your project. You can share a link to any of the following: GitHub/Etherscan/Bscscan',
    id: 'source_code',
    link: 'contact',
    i: 2
  },
  {
    type: 'text',
    title: 'Please provide contact details ( Telegram / Email / Skype / Discord) ? 📩 *',
    description: '',
    id: 'contact',
    link: 'additionnal_infos',
    i: 3
  },
  {
    type: 'text',
    title: 'Additional Information (optionnal)',
    description: '',
    id: 'additionnal_infos',
    link: 'end',
    i: 4
  },
  {
    type: 'end',
    title: 'Thanks for contacting us! We will be in touch with you shortly.<br>Your privacy is our priority. We protect your personal information.<br>🙌',
    description: '',
    id: 'end',
    link: '',
    i: 5
  }
]

const anchorFunc = (anchor_data) => { // return array of anchor tags
  return anchor_data.map((item) => (
    item.id
  ))
}

export default function FullPage() {

  let options = {
    sectionClassName: 'section',
    anchors: anchorFunc(data),
    scrollBar: false,
    navigation: false,
    verticalAlign: false,
    sectionPaddingTop: '0px',
    sectionPaddingBottom: '0px',
    arrowNavigation: false,
    touchNavigation: false,
    delay: 800,
  };

  const [obj, setObj] = useState({});


  const inputDataHandler = (name, value) => {
    console.log(name, value)
    console.log(obj)
    setObj({
      ...obj,
      [name]: value
    });
  }

  const submitBtnHandler = () => {
    console.log(obj);
    //API call here
    swal({ //show success message on completion
      title: "",
      text: "Thanks for contacting us!",
      icon: "success",
      dangerMode: false,
    })
  }

  const getLogo = () => {
    // Import result is the URL of your image
    return (<a href={ '/' }>
        <img class="logo" src="public/logo-white.png" />
      </a>);
  }

  const getItem = (item, i) => {
    console.log(item);
    if (item.type === 'start') {
      return (<Start
        item={item}
      />);
    }
    if (item.type === 'end') {
      return (<End
        obj={obj}
        item={item}
        submitBtnHandler={submitBtnHandler}
      />);
    }
    return (<Questions
      item={item}
      index={i}
      inputDataHandler={inputDataHandler}
    />);
  }

  return (
    <div>
      { getLogo() }
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        {
          data.map((item, i) => {
            return (
              <Section key={i} >
                <div>
                  <header className="App-header">
                    { getItem(item, i) }
                  </header>
                </div>
              </Section>
            )
          })
        }
      </SectionsContainer>
    </div>
  );
}

