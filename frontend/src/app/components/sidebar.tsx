
export default function SideBar() {

  const options = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Estado",
      path: "/estado",
    },
    {
      name: "Cidade",
      path: "/cidade",
    },
    {
      name: "Cliente",
      path: "/cliente",
    },
    {
      name: "Funcionario",
      path: "/funcionario",
    },
    {
      name: "Frete",
      path: "/frete",
    }
  ];

  return (
    <nav className={"bg-neutral-800 rounded-xl w-1/6 px-2 py-5 h-[80vh]"}>
      <ul>
        {
          options.map((option, i) => (
            <li key={i} className={"cursor-pointer rounded-lg my-2 hover:bg-blue-600"}>
              <a href={option.path} className={"p-3 block w-full h-full"}>{option.name}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}