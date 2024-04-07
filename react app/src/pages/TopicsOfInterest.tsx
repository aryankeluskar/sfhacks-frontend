import { useState, useEffect } from "react";
import "../css/TopicsOfInterest.css";

function TopicsOfInterest() {
  const topicArray = [
    "Sports",
    "Technology",
    "AI",
    "Dance",
    "Music",
    "Party",
    "Travel",
    "Dogs",
    "Cooking",
    "Fashion",
    "Gaming",
    "Fitness",
    "Literature",
    "Science",
    "Gardening",
    "Photography",
  ];

  const [topics, setTopics] = useState(topicArray);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopicInput, setNewTopicInput] = useState(""); // State to store the value of the new topic input field

  useEffect(() => {
    console.log(selectedTopics);
  }, [selectedTopics]);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopics((currentSelectedTopics) => {
      if (currentSelectedTopics.includes(topic)) {
        return currentSelectedTopics.filter((t) => t !== topic);
      } else {
        return [...currentSelectedTopics, topic];
      }
    });
  };

  const handleNewTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTopicInput) {
      setSelectedTopics((currentSelectedTopics) => [
        ...currentSelectedTopics,
        newTopicInput,
      ]);
      setTopics((currentTopics) => [...currentTopics, newTopicInput]);
      setNewTopicInput(""); // Clear the input field after submit
    }


  };

  // function test() {
  // }

  return (
    <div className="wholeDiv">
      <div className="topics-container">
        <h1>Select some topics of your interest</h1>
        <div>
          <div className="topics">
            {topics.map((topic, index) => (
              <button id="selected-topic"
                key={index}
                onClick={() => handleSelectTopic(topic)}
                // onClick={() => {handleSelectTopic(topic); test();}}
                className={selectedTopics.includes(topic) ? "selected" : "unselected"}
              >
                {topic}
              </button>
            ))}
          </div>
          <br></br>
          <form className="TOI-form" onSubmit={handleNewTopic}>
            <label htmlFor="newtopic" className="row-form">
                <input
                  type="text"
                  id="newtopic"
                  value={newTopicInput}
                  onChange={(e) => setNewTopicInput(e.target.value)}
                />
              <div id="submitDiv">
                <input id="submit" type="submit" />
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TopicsOfInterest;





// const element = document.getElementById('selected-topic');
// if (element) {
//   if (element.classList.contains('selected')) {
//     element.classList.remove('selected'); // Remove class name
//   } else {
//     element.classList.add('selected'); // Add class name
//   }
// }
