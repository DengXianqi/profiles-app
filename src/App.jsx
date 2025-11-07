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

// App.jsx
import { useState } from "react";
// adjust this import to wherever your profiles array lives
import { profiles } from "./profiles"; 

export default function App() {
  // 1) put profiles into state
  const [people, setPeople] = useState(profiles);

  // 3) click handler: update immutably
  function handleLike(id) {
    setPeople(ps =>
      ps.map(p => (p.id === id ? { ...p, likes: (p.likes ?? 0) + 1 } : p))
    );
  }

  return (
    <main className="cards">
      {people.map(p => (
        <article key={p.id} className="card">
          {/* render whatever fields you have */}
          <h3>{p.name}</h3>
          <p>{p.title}</p>

          {/* 2) Like button on each card */}
          <button onClick={() => handleLike(p.id)}>Like</button>
          <span style={{ marginLeft: 8 }}>{p.likes ?? 0} likes</span>
        </article>
      ))}
    </main>
  );
}
