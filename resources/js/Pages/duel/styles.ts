import styled from "styled-components"

export const Wrapper = styled.aside`
  .area {
    flex-direction: column;
  }
  .area .parties {
    display: flex;
  }
  .parties {
    flex-direction: row;
  }
  .item {
    flex-basis: 10%;
  }
  
  .column-item {
    padding: 0 16px;
  }
  
  --percent: 70%;
  
  @keyframes growth {
    from {
      opacity: 0;
      height: 0%;
    } to {
      opacity: 1;
      height: 100%;
    }
  }
`
