CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserName] NCHAR(50) NULL, 
    [Password] NCHAR(50) NULL, 
    [EmailAddress] NCHAR(100) NULL, 
    [JWT] NCHAR(500) NULL, 
    [RefreshToken] UNIQUEIDENTIFIER NULL
)
