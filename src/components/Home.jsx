import React, { useEffect, useState } from "react";

const Home = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://apimocha.com/quicksell/data");
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <MainContainer container>
        <Backdrop
          open={!isDataLoaded}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </MainContainer>
    </Box>
  );
};

export default Home;
