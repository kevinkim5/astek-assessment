export const handlePostAPI = async (url, formdata) => {
  await fetch(url, {
    method: "POST",
    body: formdata,
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      const err = await response.json();
      throw new Error(err.message);
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const handlePUTAPI = async (url, formdata) => {
  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata),
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      const err = await response.json();
      throw new Error(err.message);
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
