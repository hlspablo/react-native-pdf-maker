cmake_minimum_required(VERSION 3.4.1)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

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
        GIT_REPOSITORY https://github.com/galkahana/PDF-Writer.git
        GIT_TAG        v4.6.3
)
FetchContent_MakeAvailable(PDFHummus)

target_link_libraries(react-native-pdf-maker PDFHummus::PDFWriter)
