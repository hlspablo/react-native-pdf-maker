cmake_minimum_required(VERSION 3.4.1)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set (PACKAGE_NAME "react-native-pdf-maker-dev")

# Specifies a path to native header files.
include_directories(
        cpp
        PDFWriter/PDFWriter
        react-native/packages/react-native/React
        react-native/packages/react-native/React/Base
        react-native/packages/react-native/ReactCommon/jsi
)

# Add PDFWriter sources
# add_subdirectory(PDFWriter PDFWriter)

# add the library
add_library(react-native-pdf-maker-dev            SHARED
        cpp/DocumentWrapper.cpp
        cpp/PageWrapper.cpp
        cpp/TypedArray.cpp
        android/cpp-adapter.cpp
)

# Configure C++ 17
set_target_properties(
        react-native-pdf-maker-dev PROPERTIES
        CXX_STANDARD 17
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)

target_link_libraries(
        react-native-pdf-maker-dev
)
