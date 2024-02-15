cmake_minimum_required(VERSION 3.27.8)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

# Set the path to ios-cmake
set(IOS_CMAKE_PATH "toolchain")

# Include ios-cmake toolchain
include(${IOS_CMAKE_PATH}/ios.toolchain.cmake)

# set(CMAKE_HOST_SYSTEM_PROCESSOR "arm64")
# Define the PDF-Writer library as an external project
include(FetchContent)

FetchContent_Declare(
        PDFHummus
        GIT_REPOSITORY https://github.com/galkahana/PDF-Writer.git
        GIT_TAG        v4.6.3
)
FetchContent_MakeAvailable(PDFHummus)

# Set the development team ID
set_target_properties(PDFWriter PROPERTIES
        XCODE_ATTRIBUTE_DEVELOPMENT_TEAM "LPH9Y9TQB8"
        XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
        XCODE_ATTRIBUTE_CODE_SIGN_STYLE "Automatic"
        XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++17"
)

target_compile_definitions(LibPng PRIVATE
        PNG_ARM_NEON_OPT=0
)
