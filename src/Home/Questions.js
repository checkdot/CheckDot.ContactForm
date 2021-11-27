import React, { useState, useEffect } from 'react';
import { Input, Icon, Button } from 'antd';
import { isMobile } from 'react-device-detect';

export default function Questions({
  item,
  index,
  inputDataHandler
}) {
  const [value, setValue] = useState({
  });

  useEffect(() => {
    // Update the document title using the browser API
    console.log('render');
  }, []);

  const clickHandler = (link, i) => {
    console.log(i);
    location.href = `#${link}`;
    setTimeout(() => {
      document.getElementById((i + 1).toString()).focus();
    }, 850);
  };

  const inputHandler = (e) => {
    console.log(e.target.name, e.target.value);
    console.log(value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    inputDataHandler(e.target.name, e.target.value);
  };

  return (
    <div className="question-zone">
      <div className="title">
        <h2>
            <span className="count" style={{ fontSize: '0.4em' }}>
              {item.i}
            </span>&nbsp;
            <Icon type="arrow-right" style={{ fontSize: '0.3em' }} />&nbsp;
            <span className="title">
              {item.title}
            </span>
          </h2>
        { item.description ?
          <span className="description">
              {item.description}
          </span>
          :
          ''
        }
      </div>
      <Input
        placeholder="Type your answer here..."
        name={item.id}
        id={index}
        className="typeform-input"
        onPressEnter={() => clickHandler(item.link, item.i)}
        onChange={
          inputHandler
        }
      />
      <br />
      <div>
        <Button
          hidden={isMobile}
          icon="check"
          id="enter-btn"
          onClick={() => clickHandler(item.link, item.i)}
        >
          OK
        </Button>
        <span hidden={isMobile} className="press-enter"> press <span className="bold">ENTER ↵</span></span>
      </div>
    </div>
  );
}
