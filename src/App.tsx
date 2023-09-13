import styled from "styled-components";

const StyledButton = styled.button`
  background: #aaffaa;
  color: #222;
  font-weight: bold;
  &:hover {
    background: #bbffcc;
    color: #444;
  }
  &:active {
    background: #fff;
    color: #000;
  }
`;

export default function App() {

  const handleClick = () => {
    alert('You clicked!');
  }

  return (
    <>
      <div className="container-fluid mt-3 text-center">
        <StyledButton className="btn btn-primary border-0" onClick={handleClick}>
          Click me!
        </StyledButton> 
      </div>
    </>
  );
}
