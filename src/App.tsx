import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>{item}</li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data)
      });
  }, []);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>hello</Box>
      <List items={["one", "two", "three"]} onClick={onListClick}></List>
      <Box>{JSON.stringify(payload)}</Box>
    </div>
  );
}

export default App;
