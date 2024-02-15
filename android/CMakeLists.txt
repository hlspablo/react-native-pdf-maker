cmake_minimum_required(VERSION 3.4.1)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set (PACKAGE_NAME "react-native-pdf-maker")

# Specifies a path to native header files.
include_directories(
        ../cpp
        ../PDFWriter
)

# Add PDFWriter sources
add_subdirectory(../PDFWriter PDFWriter)

# add the library
add_library(react-native-pdf-maker            SHARED
        ../cpp/react-native-pdf-maker.cpp
        ../cpp/PDFDocumentWrapper.cpp
        ../cpp/PDFPageWrapper.cpp
        ../cpp/TypedArray.cpp
        cpp-adapter.cpp
)

# Configure C++ 17
set_target_properties(
        react-native-pdf-maker PROPERTIES
        CXX_STANDARD 17
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)

find_package(ReactAndroid REQUIRED CONFIG)
find_library(log-lib log)

target_link_libraries(
        react-native-pdf-maker
        PDFWriter
        ReactAndroid::jsi # jsi
        android # android JNI
        ${log-lib} # logcat
)
