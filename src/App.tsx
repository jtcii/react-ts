import React, { PropsWithChildren, useCallback, useEffect, useReducer, useState, useRef, ChangeEvent, FC, InputHTMLAttributes } from 'react';
import './App.css';


// components
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

const SearchInput: FC<SearchProps> = ({ value, onChange }) => (

  <input value={value} onChange={onChange}></input>

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

const Provider = (props: ProviderData) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#ffffff",
        marginBottom: "0.5rem",
        borderRadius: "0.25rem",
      }}
    >
      <img
        src={props.picture}
        style={{ maxWidth: "100%", maxHeight: "12rem" }}
        alt={props.name}
      />
      <h3>
        {props.name}, {props.license}
      </h3>
      <p>Specializing in {props.specialties.join(", ")}</p>
      <div
        style={{
          backgroundColor: "#f5fff5",
          borderRadius: "0.1rem",
          marginLeft: "2rem",
          padding: "0.5rem",
          maxWidth: "20rem",
        }}
      >
        {props.description}
      </div>
      <div>
        <h4>Availability</h4>
        {/* TODO: Display a list of all possible start times instead of time ranges */}
        {props.availability.map(({ start, end }, i) => (
          <div key={i}>
            From {start.toLocaleString()} to {end.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
};

// types
interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

interface TimeRange {
  start: Date;
  end: Date;
}

interface ProviderData {
  name: string;
  license: string;
  state: string;
  specialties: string[];
  description: string;
  picture: string;
  availability: TimeRange[];
}

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD", text: string }
  | { type: "REMOVE", id: number }


// data
const providerData: ProviderData[] = [
  {
    name: "Uthyr Poppins",
    license: "LMHC",
    state: "Florida",
    specialties: ["Anxiety", "Depression", "Grief", "Family Conflict"],
    description:
      "Hi There! I'm Uhyr Poppins. I help teenagers with anxiety and specialize in helping people cope with tough family situations. I offer therapy sessions both in person and over video chat!",
    picture:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    availability: [
      { start: new Date(2021, 2, 1, 9, 0), end: new Date(2021, 2, 1, 17, 0) },
      { start: new Date(2021, 2, 2, 9, 0), end: new Date(2021, 2, 2, 17, 0) },
      { start: new Date(2021, 2, 4, 9, 0), end: new Date(2021, 2, 4, 17, 0) },
    ],
  },
  {
    name: "Leir Gynt",
    license: "PhD",
    state: "Florida",
    specialties: [
      "Anxiety",
      "Depression",
      "Dissociative Disorders",
      "Family Conflict",
    ],
    description:
      "Do you find yourself overthinking, ruminating, or living in a constant state of stress? I'm Leir Gynt, a clinical psychologist who has devoted my life to helping people just like you.",
    picture:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [
      { start: new Date(2021, 2, 1, 9, 0), end: new Date(2021, 2, 1, 17, 0) },
      { start: new Date(2021, 2, 3, 14, 0), end: new Date(2021, 2, 3, 17, 0) },
      { start: new Date(2021, 2, 4, 14, 0), end: new Date(2021, 2, 4, 17, 0) },
    ],
  },
  {
    name: "Mowgli Twist",
    license: "LMHC",
    state: "Florida",
    specialties: [
      "Anxiety",
      "Trauma and PTSD",
      "Dissociative Disorders",
      "Spirituality",
      "Addiction",
    ],
    description:
      "Welcome! Our sessions will focus on finding your deep spirituality within, helping you understand yourself and your place in the world.",
    picture:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [
      { start: new Date(2021, 2, 1, 9, 0), end: new Date(2021, 2, 1, 12, 0) },
      { start: new Date(2021, 2, 1, 15, 0), end: new Date(2021, 2, 1, 17, 0) },
      { start: new Date(2021, 2, 2, 9, 0), end: new Date(2021, 2, 2, 12, 0) },
      { start: new Date(2021, 2, 2, 15, 0), end: new Date(2021, 2, 2, 17, 0) },
      { start: new Date(2021, 2, 3, 9, 0), end: new Date(2021, 2, 3, 12, 0) },
      { start: new Date(2021, 2, 3, 15, 0), end: new Date(2021, 2, 3, 17, 0) },
      { start: new Date(2021, 2, 4, 9, 0), end: new Date(2021, 2, 4, 12, 0) },
      { start: new Date(2021, 2, 4, 15, 0), end: new Date(2021, 2, 4, 17, 0) },
      { start: new Date(2021, 2, 5, 9, 0), end: new Date(2021, 2, 5, 12, 0) },
      { start: new Date(2021, 2, 5, 15, 0), end: new Date(2021, 2, 5, 17, 0) },
    ],
  },
  {
    name: "Cendrillon Poirot",
    license: "LMHC",
    state: "Florida",
    specialties: [
      "Anxiety",
      "Trauma and PTSD",
      "Dissociative Disorders",
      "Spirituality",
    ],
    description:
      "ABOUT ME: I have 35 years of experience as a therapist, bringing the best techniques from a lifetime of learning. ABOUT YOU: I'm client focused and will tailor our sessions to whatever you need.",
    picture:
      "https://images.pexels.com/photos/4565420/pexels-photo-4565420.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [],
  },
  {
    name: "Tinuviel Finch",
    license: "LCSW",
    state: "Florida",
    specialties: [
      "Trauma and PTSD",
      "Personality Disorders",
      "Dissociative Disorders",
      "Grief",
    ],
    description:
      "Hi, my name is Tinuviel and I am a Licensed Clinical Social Worker in the greater Orlando area.",
    picture:
      "https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [
      { start: new Date(2021, 2, 1, 10, 0), end: new Date(2021, 2, 1, 17, 30) },
      { start: new Date(2021, 2, 2, 10, 0), end: new Date(2021, 2, 2, 17, 30) },
      { start: new Date(2021, 2, 4, 10, 0), end: new Date(2021, 2, 4, 17, 30) },
    ],
  },
  {
    name: "Lucasta Panza",
    license: "LMHC",
    state: "Florida",
    specialties: [
      "Anxiety",
      "Personality Disorders",
      "Dissociative Disorders",
      "Spirituality",
    ],
    description:
      "I became a therapist because I am passionate about helping people live their best lives. I want to help you be secure, positive, and motivated every day of your life.",
    picture:
      "https://images.pexels.com/photos/6194365/pexels-photo-6194365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    availability: [
      { start: new Date(2021, 2, 3, 18, 0), end: new Date(2021, 2, 3, 24, 0) },
    ],
  },
  {
    name: "Philomel Valjean",
    license: "PMHNP",
    state: "Florida",
    specialties: [
      "Anxiety",
      "Personality Disorders",
      "Dissociative Disorders",
      "Spirituality",
    ],
    description:
      'Life does not always go as planned. I am here to help when things go off course. "I get knocked down, but I get up again. You are never gonna keep me down!"',
    picture:
      "https://images.pexels.com/photos/5473079/pexels-photo-5473079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [
      { start: new Date(2021, 2, 1, 7, 0), end: new Date(2021, 2, 1, 23, 0) },
      { start: new Date(2021, 2, 2, 7, 0), end: new Date(2021, 2, 2, 23, 0) },
      { start: new Date(2021, 2, 3, 7, 0), end: new Date(2021, 2, 3, 23, 0) },
      { start: new Date(2021, 2, 4, 7, 0), end: new Date(2021, 2, 4, 23, 0) },
      { start: new Date(2021, 2, 5, 7, 0), end: new Date(2021, 2, 5, 23, 0) },
    ],
  },
  {
    name: "Igerna Copperfield",
    license: "LMHC",
    state: "Florida",
    specialties: [
      "Dissociative Disorders",
      "Anxiety",
      "Personality Disorders",
      "Spirituality",
      "Eating Disorders",
    ],
    description:
      "Hi I'm Igerna! Are you looking for a safe space to discuss your past, your present and your future? I take you as you are, treating you without judgement.",
    picture:
      "https://images.pexels.com/photos/3545784/pexels-photo-3545784.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: [
      { start: new Date(2021, 2, 6, 9, 0), end: new Date(2021, 2, 6, 17, 0) },
      { start: new Date(2021, 2, 7, 9, 0), end: new Date(2021, 2, 7, 17, 0) },
    ],
  },
];

// functions
// Returns the number of hours a provider is available based off the availability object in ProviderData
const getTotalAvailability = (providerAvailability: TimeRange[]) => {

  const availableTime = providerAvailability.reduce((acc, timeRange) => {

    const totalTime = timeRange.end.getTime() - timeRange.start.getTime();
    return acc + totalTime;

  }, 0);

  return availableTime;

}

// Returns a sorted copy of the array in order of how many hours the provider is available
const sortByAvailability = (providers: ProviderData[]): ProviderData[] => {
  // TODO returns a sorted copy of the array in order of how many hours the provider is available
  //console.log(getTotalAvailability(providers[0].availability))
  // b-a is desc order
  const sorted = providers.sort((a, b) => getTotalAvailability(b.availability) - getTotalAvailability(a.availability));

  return sorted;

};

// app
function App() {

  // hooks
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

  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType) => {
      switch (action.type) {
        case "ADD":
          return [
            ...state,
            {
              id: state.length,
              text: action.text,
              done: false,
            }
          ]
        case "REMOVE":
          return state.filter(({ id }) => id !== action.id)
        default:
          throw new Error()
      }
    },
    []
  );

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value
      });
      newTodoRef.current.value = "";
    }
  }, []);

  const [filter, filterSet] = React.useState("");

  // ui
  return (

    <div>

      <Heading title="Introduction" />

      <Box>hello</Box>

      <List items={["one", "two", "three"]} onClick={onListClick}></List>

      <Box>{JSON.stringify(payload)}</Box>

      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }>Remove</button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>



      <div
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          backgroundColor: "#f5f5f5",
        }}
      >

        <div style={{ marginTop: "2rem" }}>
          <h1>Find a therapist near you!</h1>
        </div>

        <SearchInput
          value={filter}
          onChange={(evt) => filterSet(evt.target.value)}
        />

        <div style={{}}>
          {sortByAvailability(providerData).filter((provider) => provider.name.toLowerCase().includes(filter.toLowerCase())).map((provider) => (
            <Provider key={provider.name} {...provider} />
          ))}
        </div>

      </div>

    </div >

  );
}

export default App;