cmake_minimum_required(VERSION 3.27.8)
project(PdfMaker)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

# Set the path to ios-cmake
set(IOS_CMAKE_PATH "ios/ios-cmake")

#add_library(react-native-pdf-maker            STATIC
#        ../cpp/react-native-pdf-maker.cpp
#)

# Include ios-cmake toolchain
include(${IOS_CMAKE_PATH}/ios.toolchain.cmake)

file(GLOB SRCS
        cpp/**/*.cpp
)

add_executable(react-native-pdf-maker ${SRCS})

# Set the development team ID
set_target_properties(react-native-pdf-maker PROPERTIES
        XCODE_ATTRIBUTE_DEVELOPMENT_TEAM "LPH9Y9TQB8"
        XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
        XCODE_ATTRIBUTE_CODE_SIGN_STYLE "Automatic"
        XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++11"
)

# Define the PDF-Writer library as an external project
include(FetchContent)

FetchContent_Declare(
        PDFHummus
        GIT_REPOSITORY https://github.com/galkahana/PDF-Writer.git
        GIT_TAG        v4.6.3
)
FetchContent_MakeAvailable(PDFHummus)

## Include directories of the external library (adjust if the include paths are different)

message( STATUS "SOURCE_DIR ${PDFHummus_SOURCE_DIR}")

# Specifies a path to native header files.
target_include_directories(react-native-pdf-maker PRIVATE cpp)

file(GLOB LIB_SRCS
        "${PDFHummus_SOURCE_DIR}/PDFWriterTesting/testing/*.cpp"
)

target_sources(react-native-pdf-maker PRIVATE cpp/hello.cpp ${LIB_SRCS})

target_link_libraries(react-native-pdf-maker PRIVATE PDFHummus::PDFWriter)

# Set compiler flags (if needed)
# target_compile_options(react-native-pdf-maker PRIVATE -YourCompilerFlagsHere)
