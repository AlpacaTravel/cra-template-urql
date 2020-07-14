// src/App.js
import React from "react";
import { useQuery } from "urql";

const PLACE = /* GraphQL */ `
  query getPlace($placeId: ID!) {
    place(id: $placeId) {
      name
      contact {
        facebookUrl
      }
      address {
        locality
      }
    }
  }
`;

function App() {
  const [result] = useQuery({
    query: PLACE,
    variables: { placeId: "place/facebook:place:370266736485353" },
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <h2>
        When in Melbourne, go for a coffee at{` `}
        <a href={data.place.contact.facebookUrl}>{data.place.name}</a> in{` `}
        {data.place.address.locality} 🦙☕ 🚀
      </h2>
    </div>
  );
}

export default App;
