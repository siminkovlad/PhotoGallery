import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        background: #E5B672;
    }

    header h1 {
        margin: 0;
        padding: 20px;
        text-decoration: underline;
        font-size: 4rem;
    }

    .container-fluid,
    .row,
    .col {
        padding: 0;
        margin: 0;
    }

    .main {
        min-height: 100vh;
    }

    .carousel-control-next {
        right: -100px;
    }

    .carousel-control-prev {
        left: -100px;
    }

    .carousel-indicators {
        bottom: -70px;
    }

    .row {
        justify-content: center;
        align-items: center;
    }

    .modal-footer {
        justify-content: flex-start;
    }
    
    form,
    .pop-up-div {
        width: 100%;
        margin-top: 30px;
    }
    
    .btn {
        width: 100%;
    }

    .modal-body {
        background: #CADABA;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    li {
        font-size: 1rem;
        margin-left: 25px;
    }

    .modal-body h1 {
        font-size: 1.5rem;
        padding-left: 15px;
    }

    .modal-footer {
        width: 50%;
    }

    .modal-header button {
        outline: none;
    }

    .carousel {
        width: 60%;
    }

    img {
        width: 95%;
        border: 5px solid whitesmoke;
    }

    @media (max-width: 1000px) {
        .modal-footer {
            width: 100%;
        }
    }
       
    @media (max-width: 600px) {
        header h1 {
            font-size: 3rem;
        }

        li {
            margin-left: 15px;
        }
    
        .modal-body h1 {
            margin-top: 10px;
            padding-left: 5px;
        }
        
        .carousel {
            width: 100%;
            text-align: center;
        }
        
        .carousel-control-next,
        .carousel-control-prev {
            display: none;
        }
    }
`;
