import React, { useState} from 'react';

export function Bogen() {
  const [items, setItems] = useState([]);

  const addItem = () => {
      console.log("items", items);
      console.log("type of items", typeof items);
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.random() * 100
      }
    ]);
    console.log("items", items);
  };

  return (
    <>
      <button onClick={addItem}>Add a number</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
}
