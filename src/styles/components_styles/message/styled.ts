import styled from "styled-components";

export const MessageStyle = styled.div`
    height: 100%;
    background-color: pink;
    font-family: inter, Arial, Helvetica, sans-serif;

    .content {
        background-color: pink;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-radius: 10px;

        .message {
            padding: 12px;
            text-align: center;
        }
    }

    .names {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;

        span {
            color: #FF1493;
            font-weight: 600;
        }
    }
`;