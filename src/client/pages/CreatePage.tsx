import AddTodoForm from "../components/AddTodoForm";
import Heading from "../components/Heading";

function CreatePage() {
  return (
    <main className="flex-1 py-8 px-4">
      <Heading>Create a To-do</Heading>
      <AddTodoForm />
    </main>
  );
}

export default CreatePage;
