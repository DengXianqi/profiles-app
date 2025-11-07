// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ProfileCard from './components/ProfileCard.jsx';
// import { profiles } from './data/profiles.js';

// export default function App() {
//   return (
//     <Container className="py-4">
//       <h1 className="mb-4 text-center">Profiles</h1>
//       <Row xs={1} md={2} lg={3}>
//         {profiles.map(p => (
//           <Col key={p.id}>
//             <ProfileCard name={p.name} likes={p.likes} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// // App.jsx
// import { useState } from "react";
// // adjust this import to wherever your profiles array lives
// import { profiles } from "./data/profiles"; 

// export default function App() {
//   // 1) put profiles into state
//   const [people, setPeople] = useState(profiles);

//   // 3) click handler: update immutably
//   function handleLike(id) {
//     setPeople(ps =>
//       ps.map(p => (p.id === id ? { ...p, likes: (p.likes ?? 0) + 1 } : p))
//     );
//   }

//   return (
//     <main className="cards">
//       {people.map(p => (
//         <article key={p.id} className="card">
//           {/* render whatever fields you have */}
//           <h3>{p.name}</h3>
//           <p>{p.title}</p>

//           {/* 2) Like button on each card */}
//           <button onClick={() => handleLike(p.id)}>Like</button>
//           <span style={{ marginLeft: 8 }}>{p.likes ?? 0} likes</span>
//         </article>
//       ))}
//     </main>
//   );
// }


// App.jsx
import { useState } from "react";
import { profiles } from "./data/profiles.js"; // if default export, use: import profiles from "./data/profiles.js";

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Like handler (immutable update)
  function handleLike(id) {
    setPeople(ps => ps.map(p => (p.id === id ? { ...p, likes: (p.likes ?? 0) + 1 } : p)));
  }

  // Add form submit
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();

    // validation
    if (!trimmed) return setError("Name is required.");
    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return setError("That name already exists.");

    // make a new id (numeric)
    const nextId = people.length ? Math.max(...people.map(p => Number(p.id))) + 1 : 1;

    setPeople(ps => [...ps, { id: nextId, name: trimmed, likes: 0 }]);
    setName("");
    setError("");
  }

  return (
    <main className="app">
      {/* Add form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <label>
          Name{" "}
          <input
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={!!error}
            style={error ? { borderColor: "crimson", outlineColor: "crimson" } : undefined}
            placeholder="Add a new profile"
          />
        </label>
        <button type="submit" style={{ marginLeft: 8 }}>
          Add
        </button>
        {error && (
          <div style={{ color: "crimson", marginTop: 4, fontSize: 14 }}>
            {error}
          </div>
        )}
      </form>

      {/* Cards */}
      {people.map(p => (
        <article key={p.id} className="card" style={{ marginBottom: 12 }}>
          <h3>{p.name}</h3>
          <button onClick={() => handleLike(p.id)}>Like</button>
          <span style={{ marginLeft: 8 }}>{p.likes ?? 0} likes</span>
        </article>
      ))}
    </main>
  );
}
