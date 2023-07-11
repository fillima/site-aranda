import { styled, theme } from "@/styles";

export const Card = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '18%',
    height: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 211, 214)',
    borderRadius: 5,
    padding: 10
});

export const Title = styled('p', {
    textAlign: "center",
    fontSize: 18,
    width: "90%",
    color: 'white'
});

