import React, { useState } from "react";
import produce from "immer";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([
    {
      id: Math.floor(Math.random() * 100),
      title: "Cheongchun Blossom",
    },
    {
      id: Math.floor(Math.random() * 100),
      title: "Koe no Katachi",
    },
    {
      id: Math.floor(Math.random() * 100),
      title: "By Spring",
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [update, setUpdate] = useState({
    id: null,
    title: "",
  });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setList(
      produce((draft) => {
        draft.push({
          id: Math.floor(Math.random() * 100),
          title: name,
        });
      })
    );
    setName("");
  };
  const handleDelete = (id) => {
    setList(
      produce((draft) => {
        const i = draft.findIndex((el) => el.id === id);
        draft.splice(i, 1);
      })
    );
  };
  const handleOnPatch = () => {
    setList(
      produce((draft) => {
        const manga = draft.find((el) => el.id === update.id);
        manga.title = update.title;
      })
    );
    setName("");
    setIsEdit(false);
    setUpdate({
      id: null,
      title: "",
    });
  };
  const handleIsEdit = (manga) => {
    setIsEdit(true);
    setUpdate(manga);
  };
  return (
    <main>
      <form onSubmit={(e) => handleOnSubmit(e)} style={{ display: "flex" }}>
        <input
          placeholder="Manga name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <br />
      {list.map((el) => (
        <ul key={el.id} style={{ cursor: "pointer" }}>
          <li>
            <span onClick={() => handleDelete(el.id)}>{el.title}</span>&nbsp;
            <i
              className="ti ti-edit-circle"
              onClick={() => handleIsEdit(el)}
            ></i>
          </li>
        </ul>
      ))}
      <br />
      {isEdit && (
        <form onSubmit={handleOnPatch} style={{ display: "flex" }}>
          <input
            value={update.title}
            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
          />
          <button type="submit">Patch</button>
        </form>
      )}
    </main>
  );
};

export default App;
