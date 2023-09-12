import { TfiLinkedin } from 'react-icons/tfi'
import styled from "styled-components";

const LinkedinButton = styled.button`
  background: #0e76a8;
  &:hover {
    background: #222;
  }
`;

export default function Main(){
  return (
    <>
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="card border-0">
          <LinkedinButton
            className="btn btn-primary border-0"
            onClick={() => alert('Take me to the non-paradise city!')}
          >
            @juliobrazao
            &nbsp;
            <TfiLinkedin />
          </LinkedinButton>
        </div>
      </div>
    </>
  )
}