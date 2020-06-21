CREATE TABLE [dbo].[Friends]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Requestor] INT NOT NULL, 
    [Acceptor] INT NOT NULL, 
    [IsActive] BIT NOT NULL DEFAULT 0, 
    [RequestedDate] DATETIME NOT NULL DEFAULT GetDate(), 
    [AcceptedDate] DATETIME NULL, 
   
    CONSTRAINT [FK_Friends_ToUser1] FOREIGN KEY ([Requestor]) REFERENCES [User]([Id]),
    CONSTRAINT [FK_Friends_ToUser2] FOREIGN KEY ([Acceptor]) REFERENCES [User]([Id])
)
