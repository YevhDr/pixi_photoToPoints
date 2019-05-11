img_fil <- "/home/yevheniia/Desktop/main_300.jpg"
img <- magick::image_read(img_fil)
img_df <- RSAGA::grid.to.xyz(as.matrix(as.raster(img)))
setwd("/home/yevheniia/git/my-template/")
write.csv(img_df, "slava_to_pixels.csv")


img_fil <- "/home/yevheniia/Desktop/new_300.jpg"
img <- magick::image_read(img_fil)
img_df <- RSAGA::grid.to.xyz(as.matrix(as.raster(img)))
setwd("/home/yevheniia/git/my-template/")
write.csv(img_df, "slava_to_pixels_new.csv")
