import Medicine from "../models/medicine.js";

export const index = async (req, res) => {
   try {
    const allMedicine = await Medicine.find({});
    res.status(200).json({ success: true, allMedicine });
  } catch (e) {
    console.error("Error fetching medicines:", e);
    res.status(500).json({ error: "Something went wrong", details: e.message });
  }
};

export const createMedicine = async (req, res) => {
  // let { id } = req.params;
  let newMedicine = new Medicine(req.body);
  const response = await newMedicine.save();
  console.log("New Medicine save into db" + response);

  res.send({success: true, message: "Medicine added successfully"});
};


export const viewMedicine = async (req, res) => {
  let { id } = req.params;

  const medicine = await Medicine.findById(id);

  res.send(medicine);
  // console.error("Error in /API/medicine/search:", err);
};


export const updateMedicine = async (req, res) => {
  let { id } = req.params;

  let updateMedicine = await Medicine.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  // res.redirect(`/admin`);
  res.send(updateMedicine);
};


export const deleteMedicine = async (req, res) => {
  let { id } = req.params;

  let delMedicine = await Medicine.findByIdAndDelete(id);

  res.send({success: true, message: 'Medicine deleted successfully!!!'});
};



export const filterMedicine = async (req, res) => {
  const search = req.params.search;

  try {
    const medicine = await Medicine.find({
      name: { $regex: "^" + search, $options: "i" }, // 'i' for case-insensitive
    });

    res.send(medicine);
  } catch (error) {
    res.status(200).send({ error: "Something went wrong" });
  }
};
