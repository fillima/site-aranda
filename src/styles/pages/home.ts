import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
});

export const MagazineContext = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    padding: '2%',
    gap: '40px',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: '50px',

    '@media(max-width: 1000px)': {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px'
    }
});

export const Title = styled('p', {
    textAlign: "center",
    fontSize: 24,
    width: "80%",
    margin: 30
});

export const Description = styled('p', {
    textAlign: "center",
    fontSize: 14,
    width: "80%",
    margin: 20
});

export const List = styled('ul', {
    fontSize: 14,
});

export const ItemList = styled('li', {
    fontSize: 14,
    width: "80%"
});
