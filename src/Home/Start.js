import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

export default function Start({
  item
}) {
  const [value, setValue] = useState({
  });

  useEffect(() => {
    console.log('render');
    document.getElementById("0").focus();
  }, []);

  const clickHandler = (link, i) => {
    console.log(i);
    location.href = `#${link}`;
    setTimeout(() => {
      document.getElementById((i + 1).toString()).focus();
    }, 1100);
  };

  return (
    <div id={ item.i } className="question-zone">
      <div className="title">
        <h2 style={{ textAlign: 'center' }}>
          <span className="title" dangerouslySetInnerHTML={{ __html: item.title }}>
          </span>
        </h2>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          id="start-btn"
          onClick={() => clickHandler(item.link, item.i)}
        >
          Let's get started
        </Button>
        <span className="press-enter"> press <span className="bold">ENTER ↵</span></span>
        <div style={{ color: 'white' }}>
          <svg  style={{ display: 'initial' }} fill="white" width="12" height="12" viewBox="0 0 12 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6ZM5.99033 2.59455C5.93953 2.31465 5.69455 2.1024 5.4 2.1024C5.06863 2.1024 4.8 2.37103 4.8 2.7024V6.6L4.80967 6.70785C4.86047 6.98775 5.10545 7.2 5.4 7.2H7.8L7.90785 7.19033C8.18775 7.13953 8.4 6.89455 8.4 6.6C8.4 6.26863 8.13137 6 7.8 6H6V2.7024L5.99033 2.59455Z"></path></svg>
          <span style={{ marginLeft: '5px' }}>Takes 2 min</span>
        </div>
      </div>
    </div>
  );
}
