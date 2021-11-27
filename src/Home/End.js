import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

export default function End({
  obj,
  item,
  submitBtnHandler
}) {
  const [value, setValue] = useState({
  });

  useEffect(() => {
    console.log('render');
  }, []);

  const submitHandler = () => {
    submitBtnHandler();
  };

  return (
    <div id={ item.i } className="question-zone">
      <div className="title">
        <h2 style={{ textAlign: 'center' }}>
          "<span className="title" dangerouslySetInnerHTML={{ __html: item.title }}>
          </span>
        </h2>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          id="start-btn"
          onClick={() => submitHandler(item.link, item.i)}
        >
          Submit
        </Button>
        <span className="press-enter"> press <span className="bold">Cmd ⌘ + ENTER ↵</span></span>
      </div>
    </div>
  );
}
