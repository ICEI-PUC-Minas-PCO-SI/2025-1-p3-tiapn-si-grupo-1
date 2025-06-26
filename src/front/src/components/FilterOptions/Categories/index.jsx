import { CategoriesWrapper, CategoryButton } from "./style";
import { useFlowStore } from "../../../store/flowStore";

//Botão para acionar os filtros

export default function Categories({ filtros }) {
  const category = useFlowStore((state) => state.category);
  const setCategory = useFlowStore((state) => state.setCategory);

  return (
    <CategoriesWrapper>
      <CategoryButton
        $isActive={category === ""}
        onClick={() => setCategory("")}
      >
        Todos
      </CategoryButton>

      {Array.isArray(filtros) && filtros.length > 0
        ? filtros.map((categoria, index) => (
            <CategoryButton
              key={index}
              onClick={() =>
                setCategory(category === categoria ? "" : categoria)
              }
              $isActive={category === categoria}
            >
              {categoria}
            </CategoryButton>
          ))
        : ""}
    </CategoriesWrapper>
  );
}
