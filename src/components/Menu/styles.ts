import { styled, theme } from "@/styles";

export const Container = styled('div', {
    display: "flex",
    flex: 1,
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",

    'a': {
        color: "#666"
    }
});

export const Empresa = styled('h3', {
    color: "#666",
    fontFamily: theme.fontFamily.Roboto,
    fontWeight: theme.fontWeight.Regular
})