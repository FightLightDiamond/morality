import styled from "styled-components"

export const Wrapper = styled.aside`
  .nav {
    min-height: 42px;
    background-color: #EF5122;
    display: flex;
    justify-content: space-between;
  }
  
  .nav-list {
    padding-left: 0;
    margin: auto 16px
  }
  
  .nav-item {
    color: #fff;
    list-style: none;
    margin: 0 8px;
    display: inline-block;
  }
  
  .form-container {
    padding: 32px;
    margin: 36px auto 0 auto;
    background-color: #fff;
  }
  
  .form__row {
    padding: 8px 0;
    display: flex;
  }
  
  .form__label {
    flex: 1;
  }
  
  .form__input {
    flex: 5;
  }
  
  .area {
    flex-direction: row;
  }
  .area .parties {
    display: flex;
  }
  .parties {
    flex-direction: row;
  }
  .item {
    flex:1;
  }
  
  .column-layout {
    margin-top: 36px;
    padding: 12px 0;
    background-color: #fff;
    display: flex;
  }
  .column-item {
    padding: 0 16px;
  }
  .sidebar-one {
    flex: 1;
  }
  .sidebar-two {
    flex: 1;
  }
  .main-column {
    flex: 3;
  }
  
  .feature-layout {
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  
   @media (min-width: 700px) {
    .feature-layout {
      flex-direction: row;
    }
  }
  
  .feature-item {
    padding: 12px 16px;
    margin-top: 16px;
    flex-basis: 30%;
    background-color: #D0f00f;
  }
  
  .wrap-layout {
    background-color: #fff;
    margin-top: 36px;
    padding: 12px 0 32px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .wrap-layout__item {
    width: 148px;
    height: 90px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
    background-color: #EF5122
  }
  
  --percent: 70%;
  
  .chart-layout {
    margin: 36px auto 0 auto;
    padding: 32px 0;
    height: 320px;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }
  
  .chart-layout__item {
    align-self: flex-start;
    width: 60px;
    color: #fff;
    text-align: center;
    height: var(--percent);
    background-color: #EF5122;
    animation: growth ease 2s;
  } 
  
  @keyframes growth {
    from {
      opacity: 0;
      height: 0%;
    } to {
      opacity: 1;
      height: 100%;
    }
  }
  
  .chart-layout__item1 {
    width: 60px;
    color: #fff;
    text-align: center;
    height: 10%;
    background-color: #EF5122;
  }
  
  .the-end {
    margin: 12px auto 48px auto;
    padding: 32px 0;
    max-width: 740px;
    min-height: 360px;
    display: flex;
  }
  .the-end__first {
    padding: 4px 16px;
    background-color: #fff234;
    display: flex;
    flex: 1;
  }  
  .the-end__second {
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
  }  
  .the-end__second-one {
    padding: 4px 16px;
    background-color: #fffef5;
    flex: 1;
  }  
  .the-end__second-two {
    padding: 4px 16px;
    background-color: #fffe15;
    flex: 1;
  }
`
