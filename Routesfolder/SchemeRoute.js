import express from 'express';
import schemeModel from '../models/Schemes.js'; // Model for base schemes
import SchemaByIdModel from '../models/SchemaById.js'; // Model for detailed schemes

const schemeRouter = express.Router();

// ✅ GET all detailed schemes (used in search engine)
schemeRouter.get('/getData', async (req, res) => {
  try {
    const schemes = await SchemaByIdModel.find(); // 🔄 switched from schemeModel to SchemaByIdModel
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST: Create a new base scheme (used for icons or base listing)
schemeRouter.post('/create', async (req, res) => {
  const { scheme, icon } = req.body;
  console.log(req.body);

  const newScheme = new schemeModel({
    Scheme: scheme,
    Icon: icon
  });

  try {
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ GET a base scheme by ID
schemeRouter.get('/:id', async (req, res) => {
  try {
    const scheme = await schemeModel.findById(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ PUT: Update base scheme
schemeRouter.put('/:id', async (req, res) => {
  try {
    const updatedScheme = await schemeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScheme) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json(updatedScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE: Delete base scheme
schemeRouter.delete('/:id', async (req, res) => {
  try {
    const deletedScheme = await schemeModel.findByIdAndDelete(req.params.id);
    if (!deletedScheme) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST: Merge data by ID to detailed scheme model
schemeRouter.post('/mergByIDurl', async (req, res) => {
  console.log(req.body);
  try {
    const y = await new SchemaByIdModel({
      ID: req.body.id,
      Description: req.body.name,
      Description2: req.body.description,
      Description3: req.body.desc2,
      Benefits: req.body.benefits,
      Eligibility: req.body.eligibility,
      ApplicationProcess: req.body.applicationProcess,
      DocumentsRequired: req.body.documentsRequired,
      Link: req.body.link,
    }).save();

    console.log("Data saved successfully");
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: 'Error saving scheme details' });
  }
});

// ✅ POST: Get detailed scheme(s) by custom ID field
schemeRouter.post('/idReqGetScheme', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('Received ID:', id);

    const scheme = await SchemaByIdModel.find({ ID: id });
    console.log('Scheme found:', scheme);

    if (!scheme || scheme.length === 0) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (error) {
    console.error('Error in idReqGetScheme:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default schemeRouter;
