import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
});

export const CardProducts = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    padding: '2%',
    gap: '20px',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: '20px',

    '@media(max-width: 1000px)': {
        flexDirection: 'column',
        alignItems: 'center',
    }
});
