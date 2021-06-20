type ToDo = TTodoBasic & {
  id: number;
};

type TTodoBasic = {
  isDone: boolean;
  title: string;
  dueDate: Date;
  status: "Paused" | "In progress" | "Done";
};
