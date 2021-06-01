const { Branch } = require("../../db");

const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll()
        return res.json(branches);
    } catch (error) {
        res.send(error);
    }
}

const getBranchByLocation = async (req, res) => {
    const { latitud, longitud } = req.params
    try{
        const branch = await Branch.findOne({
            where: {
                latitud,
                longitud
            }
        })
        return res.json(branch)

    } catch (error) {
        return res.send(error)
    }
}

const getBranchById = async (req, res) => {
    const { id } = req.params
    try{
        const branch = await Branch.findOne({
            where: {
                id
            }
        })
        return res.json(branch)
    } catch (error) {
        return res.send(error)
    }
}

const editBranch = async (req, res) => {
    const { name, address, latitud, longitud, atention } = req.body
    try {
        const branch = await Branch.findOne({
            where: {
                id: req.params.id
            }
        })
        branch.name = name
        branch.atention = atention
        branch.address = address
        branch.latitud = latitud
        branch.longitud = longitud
        await branch.save()
        return res.json(branch)
    } catch (error) {
        res.send(error)
    }
}

const deleteBranch = async (req, res) => {
    const { id } = req.params
    try {
        const deletedBranch = await Branch.destroy({
            where: {
                id
            }
        });
        return res.json(deletedBranch)
    } catch (error) {
        res.send(error)
    }
}

const newBranch = async (req, res) => {
    const { name, address, latitud, longitud, atention } = req.body
    try {
        const branch = await Branch.create({
            name,
            address,
            atention,
            longitud,
            latitud
        });
        return res.json(branch);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllBranches,
    getBranchByLocation,
    getBranchById,
    editBranch,
    deleteBranch,
    newBranch,
}