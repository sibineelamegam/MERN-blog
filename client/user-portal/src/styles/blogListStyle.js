export const blogListStyles = {
  container: {
    mt: 4,
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  title: {
    textAlign: "center",
  },
  noBlogsText: {
    mt: 4,
  },
  blogListBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    mt: 2,
  },
  blogCard: {
    width: {
      xs: "100%",
      sm: "calc(50% - 16px)",
      md: "calc(33.33% - 16px)",
    },
    flexGrow: 1,
    minHeight: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  clickableContent: {
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardMedia: {
    objectFit: "cover",
    height: 250,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButtonBox: {
    p: 2,
  },
};
