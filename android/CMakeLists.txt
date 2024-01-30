cmake_minimum_required(VERSION 3.4.1)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(react-native-pdf-maker            SHARED
            ../cpp/react-native-pdf-maker.cpp
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
)

include(FetchContent)

FetchContent_Declare(
        PDFHummus
        URL https://github.com/galkahana/PDF-Writer/archive/refs/tags/v4.6.3.tar.gz
        URL_HASH SHA256=0a36815ccc9d207028567f90039785c824b211169ba5da68de84d0c15455ab62
        DOWNLOAD_EXTRACT_TIMESTAMP FALSE
        FIND_PACKAGE_ARGS
)

FetchContent_MakeAvailable(PDFHummus)

target_link_libraries(react-native-pdf-maker PDFHummus::PDFWriter)
