import styled from 'styled-components';

const Wrapper = styled.div`
  background: #eee;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .login_form {
    width: 500px;
    margin: auto;

    &__title {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #888;
    }

    form {
      background: #fff;
      border-radius: 3px;
      box-shadow: 5px 10px #888;
      padding: 30px;
      margin-top: 30px;
      box-shadow: 3px 3px 3px -3px #888;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
    }
  }
`;

export default Wrapper;
