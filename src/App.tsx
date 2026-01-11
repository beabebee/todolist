import "./App.css";
import { Button } from "./components/Button";
import { useState, useEffect } from "react";

interface DataProps {
  data: string;
  id: number;
}

function App() {
  const [data, setData] = useState<DataProps[]>(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [completedData, setCompletedData] = useState<DataProps[]>(() => {
    const storedCompleted = localStorage.getItem("completedData");
    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [inputEditValue, setInputEditValue] = useState("");
  const [editData, setEditData] = useState<DataProps | null>(null);

  function deleteTask(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("completedData", JSON.stringify(completedData));
  }, [completedData]);

  return (
    <div className="container">
      <div className="title">
        <h1>TO DO LIST</h1>
        <h5>Organize suas tarefas!</h5>
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!inputValue) return;
          setData((prev) => [
            ...prev,
            {
              data: inputValue,
              id: Math.random(),
            },
          ]);
          setInputValue("");
        }}
      >
        <input
          type="text"
          placeholder="Digite sua tarefa"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" text="Adicionar" />
      </form>
      <br></br>
      <table>
        <thead>
          <tr>
            <th style={{ width: "60%" }}>Tarefa</th>
            <th style={{ width: "40%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td>Nenhuma tarefa por aqui...</td>
            </tr>
          )}
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {editData !== null && editData.id === item.id ? (
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      if (!inputEditValue) return;
                      setData((prev) =>
                        prev.map((item) =>
                          item.id === editData?.id
                            ? { ...item, data: inputEditValue }
                            : item
                        )
                      );
                      setEditData(null);
                      setInputEditValue("");
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Altere sua tarefa"
                      value={inputEditValue}
                      onChange={(e) => setInputEditValue(e.target.value)}
                    />
                    <Button type="submit" text="Salvar" />
                  </form>
                ) : (
                  item.data
                )}
              </td>
              <td className="acoes">
                <Button
                  text="Concluir"
                  onClick={() => {
                    // Atualiza completedData (o useEffect salvará automaticamente)
                    setCompletedData((prev) => [...prev, item]);
                    deleteTask(item.id);
                  }}
                  disabled={editData !== null}
                />
                <Button
                  text="Editar"
                  onClick={() => {
                    setEditData(item);
                    setInputEditValue(item.data);
                  }}
                  disabled={editData !== null}
                />
                <Button
                  text="Excluir"
                  onClick={() => deleteTask(item.id)}
                  disabled={editData !== null}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <table>
        <thead>
          <tr>
            <th style={{ width: "100%" }}>Tarefas concluídas =D</th>
          </tr>
        </thead>
        <tbody>
          {completedData.length === 0 && (
            <tr>
              <td>Nenhuma tarefa concluída</td>
            </tr>
          )}
          {completedData.map((item) => (
            <tr key={item.id}>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;