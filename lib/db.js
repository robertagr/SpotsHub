
import { connectMongo } from "./mongoose"
import User from '../db/models/User'
import Favorite from "../db/models/Favorite"


export async function getAllUsers() {
    await connectMongo();

    return User.find({isActive: true})
}

export async function getFavoritesByUserId(userId) {
    return Favorite.find({userId}).populate('spotId').exec()
}

export async function isSpotFavorite(userId, spotId) {
    const favorite = await Favorite.findOne({
        userId,
        spotId
    })

    return !!favorite
}

export async function addFavorite(userId, spotId) {
    const newFav = new Favorite({
        userId,
        spotId
    })

    await newFav.save()
}

export async function removeFavorite(userId, spotId) {
    Favorite.findAndDelete({
        userId,
        spotId
    })
}

export async function toggleFavorite(userId, spotId) {
    if (isSpotFavorite(userId, spotId)) {
        removeFavorite(userId, spotId)
    } else {
        addFavorite(userId, spotId)
    }
}


